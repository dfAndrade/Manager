defmodule TimeManagerWeb.PageView do
  use TimeManagerWeb, :view

  def get_tabs(conn) do
    path = &tasks_path/2
    [
      %{text: "Calendar", to: get_path_caller(conn, path, :index), active: action_name(conn) == :index},
      %{text: "Home", to: get_path_caller(conn, path, :index), active: action_name(conn) == :index}
    ]
  end

  def render("scripts.html", _assigns) do
    ~s{<script>require("web/static/js/posts").Post.run()</script>}
    |> raw
  end
end
