defmodule GameServer.MlabalabaRoom do
    use GenServer

    @name  __MODULE__

    def start_link(_) do
      GenServer.start_link(__MODULE__, %{} , name: @name)
    end
    
    def add(player) do
      GenServer.cast(@name , player)
    end

    def view() do
      GenServer.call(@name, :view)
    end

    #Server (callbacks)

    def init(state) do
        {:ok, state}
    end

    def handle_call(:view ,_from , currentPlayer) do
      {:reply , currentPlayer , currentPlayer}
    end

    def handle_cast(newPlayer, currentPlayer) when currentPlayer == %{} do
      {:noreply , newPlayer}
    end

    def handle_cast(newPlayer, currentPlayer) do
      uuid = Ecto.UUID.generate
      GameServerWeb.Endpoint.broadcast("mlabalaba:lobby", "user:" <> newPlayer[:user], %{room: uuid , userTurn: newPlayer[:user]} )
      GameServerWeb.Endpoint.broadcast("mlabalaba:lobby", "user:" <> currentPlayer[:user], %{room: uuid , userTurn: newPlayer[:user]} )
      {:noreply , %{}}
    end

end