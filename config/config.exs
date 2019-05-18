# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :time_manager,
  ecto_repos: [TimeManager.Repo]

# Configures the endpoint
config :time_manager, TimeManagerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "0gzmSNHcZRNru9S5lLyryc7y3iHxWLX2frf+B7eEsZ1Ape9ODJ9MQx/sWelZ8+2v",
  render_errors: [view: TimeManagerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TimeManager.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
