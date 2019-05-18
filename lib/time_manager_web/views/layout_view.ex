defmodule TimeManagerWeb.LayoutView do
  use TimeManagerWeb, :view

  def navbar_item(assigns) do

    render "navbar_item.html", assigns
  end

  def navbar_loader(conn, module) do
    render "navbar.html", tabs: module.get_tabs(conn)
  end
end
