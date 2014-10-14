class IdeasController < ApplicationController
before_filter :signin_check, :only => ["poll"]
#before_filter :signin_check, :only => ["show"]
before_filter :admin_check, :only => ["edit","update","destroy","create","new"]
  # GET /ideas
  # GET /ideas.json
  def index
    @ideas = Idea.paginate(page: params[:page], :per_page => 5)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @ideas }
    end
  end

  # GET /ideas/1
  # GET /ideas/1.json
  def show
    @idea = Idea.find(params[:id])
@comment = @idea.comments.build

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @idea }
    end
  end

  # GET /ideas/new
  # GET /ideas/new.json
  def new
    @idea = Idea.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @idea }
    end
  end

  # GET /ideas/1/edit
  def edit
    @idea = Idea.find(params[:id])
  end

  # POST /ideas
  # POST /ideas.json
  def create
    @idea = Idea.new(params[:idea])

    respond_to do |format|
      if @idea.save
        format.html { redirect_to @idea, notice: 'Idea was successfully created.' }
        format.json { render json: @idea, status: :created, location: @idea }
      else
        format.html { render action: "new" }
        format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /ideas/1
  # PUT /ideas/1.json
  def update
    @idea = Idea.find(params[:id])

    respond_to do |format|
      if @idea.update_attributes(params[:idea])
        format.html { redirect_to @idea, notice: 'Idea was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ideas/1
  # DELETE /ideas/1.json
  def destroy
    @idea = Idea.find(params[:id])
    @idea.destroy

    respond_to do |format|
      format.html { redirect_to ideas_url }
      format.json { head :no_content }
    end
  end
  
  def poll
  @par1=params[:vote]
  @par=params
  logger.debug '----------------------------------------------------------------------------'
  logger.debug '----------------------------------------------------------------------------'
  logger.debug '----------------------------------------------------------------------------'
  logger.debug '@par'
  logger.debug @par[:vote]
  logger.debug Poll.find_by_member_id(current_member.id).present?
  if !Poll.find_by_member_id(current_member.id).present?
	if(@par[:vote] == "windows")
		@poll=Poll.for_ram(current_member.id) 
		@poll.save
		else
		@poll=Poll.for_ramesh(current_member.id)
		@poll.save
	end
	redirect_to ideas_path, notice: 'You are done with poll..!!'
  else
	redirect_to ideas_path, alert: 'Hey...you already participated in poll..!!'
  end
  
  end

  
  private
  
  def signin_check
  if !member_signed_in?
  redirect_to new_member_session_path
  end
  end
  
end
