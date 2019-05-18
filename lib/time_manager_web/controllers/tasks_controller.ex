defmodule TimeManagerWeb.TasksController do
  use TimeManagerWeb, :controller

  alias TimeManager.Manager.Task

  def index(conn, _params) do
    tasks = Task.get_all()
    render(conn, "index.html", tasks: tasks)
  end

  def new(conn, _) do
    changeset = Task.changeset(%Task{}, %{})
    render(conn, "new.html", changeset: changeset)
  end

  def show(conn, %{"task_id" => id}) do
    with %Task{} = task <- Task.get(id) do
      render(conn, "show.html", task: task)
    end
  end

  def create(conn, %{"post" => params}) do
    with {:ok, _task} <- Task.add(params) do
      redirect(conn, to: tasks_path(conn, :index))
    else
      {:error, changeset} ->
        render(conn, "new.html", changeset: %{changeset | action: :new})
    end
  end
end
