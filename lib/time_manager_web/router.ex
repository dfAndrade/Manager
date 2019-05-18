defmodule TimeManagerWeb.Router do
  use TimeManagerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TimeManagerWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/tasks", TasksController, :index
    get "/tasks/new", TasksController, :new
    get "/tasks/:task_id", TasksController, :show
    post "/tasks", TasksController, :create
  end

  # Other scopes may use custom stacks.
  # scope "/api", TimeManagerWeb do
  #   pipe_through :api
  # end
end
