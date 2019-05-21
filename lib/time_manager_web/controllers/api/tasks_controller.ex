defmodule TimeManagerWeb.API.TasksController do
  use TimeManagerWeb, :controller
  alias TimeManager.Manager.Task

  @moduledoc false

  def index(conn, params) do
    tasks = Task.get_from_period(params["start_date"], params["end_date"])
    |> Enum.map(&Task.task_json/1)
    json(conn, tasks)
  end
end
