defmodule TimeManagerWeb.TasksView do
  use TimeManagerWeb, :view
  import TimeManager.Utils

  def get_tabs(conn) do
    path = &tasks_path/2
    [
      %{text: "Calendar", to: get_path_caller(conn, path, :index), active: action_name(conn) == :index},
      %{text: "Home", to: get_path_caller(conn, path, :new), active: action_name(conn) == :index}
    ]
  end

  def week_from(day) do
    day_of_week = Date.day_of_week(day) - 1
    current = Date.add(day, -day_of_week)

    Enum.reduce 7..1, [], fn day, res ->
      current = Date.add(current, day - 1)
      week_str = get_string_from_day(day)
      [
        [
          day: current.day,
          week_str: week_str,
          trimmed: String.slice(week_str, 0..2),
          active: today?(current)
        ] | res
      ]
    end
  end

  def render("scripts.html", _assigns) do
    ~s{<script>require("web/static/js/posts").Post.run()</script>}
    |> raw
  end



end
