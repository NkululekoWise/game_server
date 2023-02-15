defmodule GameServerWeb.GamesChannel do
  use GameServerWeb, :channel
  alias GameServer.MlabalabaRoom
  # intercept ["shout"]

  @impl true
  def join("mlabalaba:lobby", _payload, socket) do
    
    { :ok, socket }
  end

  @impl true
  def join("mlabalaba:" <> _room, _payload, socket) do
    { :ok, socket }
  end

  def handle_in("mlabalaba:" <> room , payload, socket) do
    broadcast(socket, "mlabalaba:" <> room , payload)
    {:noreply, socket} 
  end

  def handle_in("mlabalaba:take:" <> room , payload, socket) do
    broadcast(socket, "mlabalaba:take:" <> room  , payload)
    {:noreply, socket} 
  end

  def handle_in("getuserid", payload, socket) do
    uuid = Ecto.UUID.generate
    {:reply,{:ok , %{user: uuid}}, socket}
  end

  def handle_in("addToGameRoom", user , socket) do
     MlabalabaRoom.add(%{user: user["user"]})
     {:noreply, socket} 
  end

  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

end
