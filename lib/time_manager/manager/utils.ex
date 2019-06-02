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

  def parse_int_to_time(int) when is_integer(int) do
    if (int < 10), do: "0#{int}:00", else: "#{int}:00"
  end

  def pad_value(input, pad) when is_integer(input) and is_integer(pad) do
    IO.inspect(input, label: "ternary")
    if (input < :math.pow(10, pad)), do: String.duplicate("0", pad  - length(Integer.digits(input))) <> "#{input}", else: "#{input}"
  end

  def pad_value(input, pad) when is_integer(pad) do
    {input, _} = Integer.parse(input)
    IO.inspect(input, label: "input")
    pad_value(input, pad)
  end

  def parse_map_to_naive_datetime_str(%{} = map) do
    IO.inspect(map)
    date = Enum.join(
      [
        pad_value(map["year"], 3),
        pad_value(map["month"], 2),
        pad_value(map["day"], 2)
      ],
      "/"
    )
    time = Enum.join(
      [
        pad_value(map["hour"], 2),
        pad_value(map["minute"], 2)
      ],
      ":"
    )
    date <> " " <> time
  end

end
