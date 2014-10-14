require 'test_helper'

class KushisControllerTest < ActionController::TestCase
  setup do
    @kushi = kushis(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:kushis)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create kushi" do
    assert_difference('Kushi.count') do
      post :create, kushi: {  }
    end

    assert_redirected_to kushi_path(assigns(:kushi))
  end

  test "should show kushi" do
    get :show, id: @kushi
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @kushi
    assert_response :success
  end

  test "should update kushi" do
    put :update, id: @kushi, kushi: {  }
    assert_redirected_to kushi_path(assigns(:kushi))
  end

  test "should destroy kushi" do
    assert_difference('Kushi.count', -1) do
      delete :destroy, id: @kushi
    end

    assert_redirected_to kushis_path
  end
end
