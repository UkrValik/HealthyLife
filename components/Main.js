import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HabitList from './HabitList';
import Categories from './Categories';
import Subcategories from './Subcategories';

const MainStack = createStackNavigator();

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            homeScreenOptions: {
                headerStyle: {
                    backgroundColor: '#D6AD85',
                },
                headerTintColor: '#67423C',
                headerTitleStyle: {
                    fontSize: 28,
                    fontFamily: Platform.OS === 'android' ? 'serif' : 'AppleSDGothicNeo-Thin',
                    fontWeight: '300'
                },
                headerBackTitle: 'Назад'
            }
        }
    }

    render() {
        return(
            <NavigationContainer>
                <MainStack.Navigator initialRouteName='Home' screenOptions={this.state.homeScreenOptions}>
                    <MainStack.Screen name='Home' component={HabitList} options={{ title: 'Healthy Life' }}/>
                    <MainStack.Screen name='Categories' component={Categories} options={{title: 'Категории'}}/>
                    <MainStack.Screen name='Subcategories' component={Subcategories} />
                </MainStack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Main;
