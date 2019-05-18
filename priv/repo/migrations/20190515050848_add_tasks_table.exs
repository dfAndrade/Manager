defmodule TimeManager.Repo.Migrations.AddTasksTable do
  use Ecto.Migration

  def change do
    create table("tasks") do
      add :title, :string, size: 100
      add :color, :string, size: 7
      add :priority, :integer
      add :date_completed, :naive_datetime
      add :date_start, :naive_datetime
      add :date_end, :naive_datetime

      timestamps()
    end
  end
end
