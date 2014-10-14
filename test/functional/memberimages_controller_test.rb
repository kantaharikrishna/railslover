require 'test_helper'

class MemberimagesControllerTest < ActionController::TestCase
  setup do
    @memberimage = memberimages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:memberimages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create memberimage" do
    assert_difference('Memberimage.count') do
      post :create, memberimage: { image: @memberimage.image, member_id: @memberimage.member_id }
    end

    assert_redirected_to memberimage_path(assigns(:memberimage))
  end

  test "should show memberimage" do
    get :show, id: @memberimage
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @memberimage
    assert_response :success
  end

  test "should update memberimage" do
    put :update, id: @memberimage, memberimage: { image: @memberimage.image, member_id: @memberimage.member_id }
    assert_redirected_to memberimage_path(assigns(:memberimage))
  end

  test "should destroy memberimage" do
    assert_difference('Memberimage.count', -1) do
      delete :destroy, id: @memberimage
    end

    assert_redirected_to memberimages_path
  end
end
