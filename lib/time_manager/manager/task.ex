defmodule TimeManager.Manager.Task do
  use Ecto.Schema

  import Ecto.Query
  import Ecto.Changeset

  alias TimeManager.Repo
  alias TimeManager.Manager.Task

  schema "tasks" do
    field :title, :string
    field :color, :string
    field :priority, :integer
    field :date_completed, :naive_datetime
    field :date_start, :naive_datetime
    field :date_end, :naive_datetime

    field :temp_date_start, :string, virtual: true
    field :temp_date_end, :string, virtual: true
    timestamps()
  end

  @required_fields ~w(title priority temp_date_start)a
  @optional_fields ~w(date_completed temp_date_end color)a

  def changeset(task, params \\ %{}) do
    task
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_length(:title, min: 3, max: 100)
    |> parse_date()
    |> init_color()
  end

  # Creates task with default one hour duration
  defp parse_date(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{:temp_date_start => date_start} = changes} ->
        formatted_date_start = NaiveDateTime.from_iso8601!(date_start <> ":00")
        changeset = put_change(changeset, :date_start, formatted_date_start)
        case Map.fetch(changes, :temp_date_end) do
          {:ok, date_end} ->
            put_change(changeset, :date_end, NaiveDateTime.from_iso8601!(date_end <> ":00"))
          :error ->
            put_change(changeset, :date_end, NaiveDateTime.add(formatted_date_start, 60 * 60, :second))
        end
      _ ->
        changeset
    end
  end

  defp init_color(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: false} ->
        changeset
      %Ecto.Changeset{valid?: true, changes: %{:color => _}} ->
        changeset
      _ ->
        put_change(changeset, :color, "#ffffff")
     end
  end

  # defp safe_truncate(%Changeset{} = cs) do
  #   dc = Changeset.get_change(cs, :date_completed)
  #   fix = Utils.Misc.truncate(dc)
  #   Changeset.put_change(cs, :date_completed, fix)
  # end


  # Queries

  def get_all do
    (from t in Task)
    |> Repo.all
  end

  def get(id) do
    Repo.get_by!(Task, id: id)
  end

  # Returns a simple map of the task
#  def get_all_simple do
#    (from t in Task, select: {t.title, t.priority, t.date_completed})
#    |> EntityRepo.all
#  end

  def add(task) do
    changeset = Task.changeset(%Task{}, task)
    case changeset.valid? do
      true -> Repo.insert(changeset)
      false -> {:error, changeset}
    end
  end



#  @spec is_complete?(Task.t()) :: boolean()
#  def is_complete?(%Task{date_completed: dc}) do
#    case dc do
#      %NaiveDateTime{} -> true
#      nil -> false
#    end
#  end

#  def complete(%Task{} = task, dt \\ NaiveDateTime.utc_now()) do
#    Task.changeset(task, %{date_completed: dt})
#    |> EntityRepo.update!
#  end

end