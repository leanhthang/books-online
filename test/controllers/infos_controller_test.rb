require 'test_helper'

class InfosControllerTest < ActionDispatch::IntegrationTest
  test "should get privacy" do
    get infos_privacy_url
    assert_response :success
  end

end
