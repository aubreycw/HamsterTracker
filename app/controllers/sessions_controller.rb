class SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      session_params[:username],
      session_params[:password]
    )

    if @user.nil?
      flash.now[:errors] = ["Incorrect username and/or password"]
      render :new
    else
      login_user!(@user)
      redirect_to :root
    end
  end

  def destroy
    logout_user!
    redirect_to :root
  end

  def new
    render :new
  end

  def session_params
    params.require(:user).permit(:username, :password)
  end
end