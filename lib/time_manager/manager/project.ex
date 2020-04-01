defmodule Project do
  use Ecto.Schema

  import Ecto.Query
  import Ecto.Changeset
  import TimeManager.Utils

  @moduledoc false
  schema "projects" do
    field :title, :string
    field :color, :string
    field :date_completed, :naive_datetime
    field :date_start, :naive_datetime
    field :date_end, :naive_datetime

    timestamps()
  end

  @required_fields ~w(title date_start date_end)a
  @optional_fields ~w(date_completed temp_date_end color)a

  def changeset(task, params \\ %{}) do
    task
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_length(:title, min: 3, max: 100)
    #|> parse_date()
    #|> init_color()
  end

end
