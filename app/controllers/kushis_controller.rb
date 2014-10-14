class KushisController < ApplicationController
before_filter :admin_check, :only => ["index","edit","update","destroy","create","new"]
  # GET /kushis
  # GET /kushis.json
  def index
    @kushis = Kushi.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @kushis }
    end
  end

  # GET /kushis/1
  # GET /kushis/1.json
  def show
    @kushi = Kushi.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @kushi }
    end
  end

  # GET /kushis/new
  # GET /kushis/new.json
  def new
    @kushi = Kushi.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @kushi }
    end
  end

  # GET /kushis/1/edit
  def edit
    @kushi = Kushi.find(params[:id])
  end

  # POST /kushis
  # POST /kushis.json
  def create
    @kushi = Kushi.new(params[:kushi])

    respond_to do |format|
      if @kushi.save
        format.html { redirect_to @kushi, notice: 'Kushi was successfully created.' }
        format.json { render json: @kushi, status: :created, location: @kushi }
      else
        format.html { render action: "new" }
        format.json { render json: @kushi.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /kushis/1
  # PUT /kushis/1.json
  def update
    @kushi = Kushi.find(params[:id])

    respond_to do |format|
      if @kushi.update_attributes(params[:kushi])
        format.html { redirect_to @kushi, notice: 'Kushi was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @kushi.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kushis/1
  # DELETE /kushis/1.json
  def destroy
    @kushi = Kushi.find(params[:id])
    @kushi.destroy

    respond_to do |format|
      format.html { redirect_to kushis_url }
      format.json { head :no_content }
    end
  end
end
