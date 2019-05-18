defmodule TimeManagerWeb.Utils do
  @moduledoc false

  def get_path_caller(conn, path, to) do
    fn () -> path.(conn, to) end
  end
end
