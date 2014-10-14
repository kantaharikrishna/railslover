class MemberimagesController < ApplicationController
  # GET /memberimages
  # GET /memberimages.json
  def index
    @memberimages = Memberimage.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @memberimages }
    end
  end

  # GET /memberimages/1
  # GET /memberimages/1.json
  def show
    @memberimage = Memberimage.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @memberimage }
    end
  end

  # GET /memberimages/new
  # GET /memberimages/new.json
  def new
    @memberimage = Memberimage.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @memberimage }
    end
  end

  # GET /memberimages/1/edit
  def edit
    @memberimage = Memberimage.find(params[:id])
  end

  # POST /memberimages
  # POST /memberimages.json
  def create
    @memberimage = Memberimage.new(params[:memberimage])

    respond_to do |format|
      if @memberimage.save
        format.html { redirect_to ideas_path, notice: 'Memberimage was successfully created.' }
        format.json { render json: @memberimage, status: :created, location: @memberimage }
      else
        format.html { render action: "new" }
        format.json { render json: @memberimage.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /memberimages/1
  # PUT /memberimages/1.json
  def update
    @memberimage = Memberimage.find(params[:id])

    respond_to do |format|
      if @memberimage.update_attributes(params[:memberimage])
        format.html { redirect_to ideas_path, notice: 'Memberimage was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @memberimage.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /memberimages/1
  # DELETE /memberimages/1.json
  def destroy
    @memberimage = Memberimage.find(params[:id])
    @memberimage.destroy

    respond_to do |format|
      format.html { redirect_to memberimages_url }
      format.json { head :no_content }
    end
  end
end
