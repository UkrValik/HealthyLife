import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HabitList from './HabitList';
import Categories from './Categories';

const MainStack = createStackNavigator();

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesScreenOptions: {
                headerStyle: {
                    backgroundColor: '#84a9ac'
                },
                headerTintColor: '#204051',
                headerTitleStyle: {
                    fontSize: 28,
                    fontFamily: Platform.OS === 'android' ? 'serif' : 'Marker Felt'
                }
            }
        }
    }

    render() {
        return(
            <NavigationContainer>
                <MainStack.Navigator initialRouteName='Home' screenOptions={this.state.categoriesScreenOptions}>
                    <MainStack.Screen name='Home' component={HabitList}/>
                    <MainStack.Screen name='Categories' component={Categories} options={{title: 'Категории'}}/>
                </MainStack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Main;
