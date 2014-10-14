class RegistrationController < Devise::RegistrationsController

def new

@member= Member.new
@contact = Contact.new
end

def create

@member = Member.new
@member.username = params[:member][:username]
@member.email = params[:member][:email]
@member.password = params[:member][:password]
@member.password_confirmation =params[:member][:password_confirmation]

@contact = Contact.new
@contact.mobile = params[:contact][:mobile]
@contact.address = params[:contact][:address]
@contact.member_id = params[:contact][:member_id]
@member.valid?
if @member.errors.blank?

@member.save
@contact.member = @member
@contact.save
MemberMailer.registration_confirmation(@member).deliver 
redirect_to ideas_path
else
render :action => "new"
end
end
def edit
end
def show
end

end
