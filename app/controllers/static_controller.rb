class StaticController < ApplicationController
def contact
end
def techno_news
end
def social_news
end
def profile
	@profile=Member.find_by_id(current_member.id)
end
def update
end
def memberslist
	@members = Member.paginate(page: params[:page], :per_page => 10)
end
def kushi
	@kushis=Kushi.all
end
def details
	@detail = Member.find_by_id(params[:id])
	@memberimage = Memberimage.find_by_member_id(params[:id])
end 
end
