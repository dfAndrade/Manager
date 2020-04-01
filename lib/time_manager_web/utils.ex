defmodule TimeManagerWeb.Utils do
  @moduledoc false

  def get_path_caller(conn, path, to) do
    fn () -> path.(conn, to) end
  end

  def set_default(conn, key, value) do
    if Map.has_key?(conn.params, key) do
      conn
    else
      %{conn | params: Map.merge(conn.params, %{key => value})}
    end
  end
end
