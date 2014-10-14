class MemberMailer < ActionMailer::Base
  default :from => "harikrishna0803@gmail.com"  
  
  def registration_confirmation(member)  
    mail(:to => member.email, :subject => "Successfully Registered..!!", :body =>"Your Email-id is: #{member.email} and Your password is: #{member.password}")   
end
def schedule_check(members)  
	members.each do |member|
    mail(:to => member.email, :subject => "Hi #{member.username}, hope you are doing great today...!!", :body =>"Hi #{member.username}, do rock the things today.")  
    end 
end
end
