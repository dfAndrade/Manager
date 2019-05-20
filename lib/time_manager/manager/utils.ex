defmodule TimeManager.Utils do
  @moduledoc false

  def get_string_from_day(date) when is_integer(date) do
    case date do
      1 -> "Monday"
      2 -> "Tuesday"
      3 -> "Wednesday"
      4 -> "Thursday"
      5 -> "Friday"
      6 -> "Saturday"
      7 -> "Sunday"
      _ -> "INVALID"
    end
  end

  def get_string_from_day(date) do
    get_string_from_day(Date.day_of_week(date))
  end

  def today?(date) do
    Date.utc_today().day == date.day
  end

  def parse_naive_datetime(date) do
    NaiveDateTime.from_iso8601!(date <> ":00")
  end

end
