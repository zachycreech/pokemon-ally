import { StatusBar } from "expo-status-bar";
import { Home, PokemonParty, PkmnDetails } from "./screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { createDrawerNavigator } from "@react-navigation/drawer";

export type NavigationType = {
  HomeDrawer: undefined;
  Home: undefined;
  Details: { id: number };
};

const Stack = createStackNavigator<NavigationType>();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={() => <PokemonParty />}>
      <Drawer.Screen
        component={Home}
        name="Home"
        options={{ title: "Pokemon" }}
      />
    </Drawer.Navigator>
  );
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <Stack.Navigator>
            <Stack.Screen
              name="HomeDrawer"
              component={DrawerNavigator}
              options={{ title: "Pokemon", headerShown: false }}
            />
            <Stack.Screen name="Details" component={PkmnDetails} />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  );
}
