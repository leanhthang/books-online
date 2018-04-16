require 'test_helper'

class ChaptersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get chapters_index_url
    assert_response :success
  end

  test "should get edit" do
    get chapters_edit_url
    assert_response :success
  end

  test "should get approve_by" do
    get chapters_approve_by_url
    assert_response :success
  end

  test "should get assign_to" do
    get chapters_assign_to_url
    assert_response :success
  end

end
