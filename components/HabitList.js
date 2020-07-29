import React from 'react';
import { FlatList, View, Text, Dimensions, StyleSheet, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

class HabitList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            habits: [
                {
                    text: 'Добавить задачу',
                    icon: 'plus',
                    id: 0,
                },
            ],
        };
    }

    renderHabit = ({ item }) => (
        <View style={styles.iconContainer}>
            <View style={styles.border}>
                <Icon
                    iconStyle={styles.icon}
                    name={item.icon}
                    size={Dimensions.get('window').width / 4}
                    type='font-awesome'
                    color='#3b6978'
                    />
            </View>
            <Text style={styles.text}>{item.text}</Text>
        </View>
    )

    render() {
        return (
            <View>
                <View style={styles.logo}>
                    <Text style={{color: '#3b6978', marginTop: 20,}}>
                        LOGO
                    </Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.container}
                    data={this.state.habits}
                    renderItem={this.renderHabit}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    horizontal={false}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: '12%',
    },
    iconContainer: {
        marginVertical: 20,
        flex: 0.5,
        alignItems: 'center',
    },
    icon: {
        marginTop: 5,
    },
    text: {
        margin: 0,
        alignSelf: 'center',
        fontSize: 22,
        color: '#204051',
        fontFamily: Platform.OS === 'android' ? 'serif' : 'Marker Felt'
    },
    border: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        borderRadius: Dimensions.get('window').width / 5, 
        borderColor: '#3b6978', 
        borderWidth: 5,
        justifyContent: 'center',
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#84a9ac',
    },
});

export default HabitList;
