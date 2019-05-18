defmodule TimeManagerWeb.PageView do
  use TimeManagerWeb, :view

  def get_tabs(conn) do
    path = &tasks_path/2
    [
      %{text: "Calendar", to: get_path_caller(conn, path, :index), active: action_name(conn) == :index},
      %{text: "Home", to: get_path_caller(conn, path, :index), active: action_name(conn) == :index}
    ]
  end
end
