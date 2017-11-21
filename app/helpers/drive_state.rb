
require "tempfile"

require "google/apis/drive_v3"
require "googleauth"
require "googleauth/stores/file_token_store"

class DriveState
  def self.init_for_session(session)
    session[:drivestate] = DriveState.new(User.find_by(id: session[:user_id]))
  end

  def initialize(user)
    @user = user
    tempfile = make_credential_file


    client_id = Google::Auth::ClientId.from_file(File.join(Rails.root, 'config', 'drive_api_secret.json'))
    token_store = Google::Auth::Stores::FileTokenStore.new(file: tempfile)
    authorizer = Google::Auth::UserAuthorizer.new(
      client_id, Google::Apis::DriveV3::AUTH_DRIVE_FILE, token_store
    )
    user_id = "default" # why 'default'?
    credentials = authorizer.get_credentials(user_id)
    if credentials.nil? then
      p "credentials expired or invalid for user #{@user.id}"
    else
      @service = Google::Apis::DriveV3::DriveService.new
      @service.client_options.authorization = credentials
    end
  end

  private
    def make_credential_file
      file = Tempfile.new("credentials")
      file.write(@user.drive_cred)
      return file
    end
end
