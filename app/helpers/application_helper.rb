module ApplicationHelper
def store_location
session[:return_to] = request.fullpath
end

def redirect_back_or(default)
redirect_to(session[:return_to] || default)
session.delete(:return_to)
end
def signin_check
  if !member_signed_in?
  store_location
  redirect_to new_member_session_path
  end
  end
  def admin_check
  if !member_signed_in?
  redirect_to ideas_path
  end
  if member_signed_in?
  if !current_member.email == "kantaharikrishna@gmail.com" 
  redirect_to ideas_path
  end
  end
  end
  def full_title(page_title)
base_title = "RailsLover"
if page_title.empty?
base_title
else
"#{base_title} | #{page_title}"
end
end
  
end
