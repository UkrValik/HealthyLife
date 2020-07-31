import React from 'react';
import { FlatList, View, Text, Dimensions, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Icon, Button } from 'react-native-elements';

class HabitList extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {

        const { navigate } = this.props.navigation;

        // const renderHabit = ({ item }) => (
        //     <View style={styles.iconContainer}>
        //         <View style={styles.border}>
        //             <Icon
        //                 iconStyle={styles.icon}
        //                 name={item.icon}
        //                 size={Dimensions.get('window').width / 4}
        //                 type='font-awesome'
        //                 color='#67423C'
        //                 onPress={() => navigate('Categories')}
        //                 />
        //         </View>
        //         <Text style={styles.text}>{item.text}</Text>
        //     </View>
        // )

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>
                        Добавьте свои задачи и отслеживайте динамику их исполнения
                    </Text>
                </View>
                <Button
                    title='Добавить'
                    icon={() => (<Icon
                        name='plus'
                        type='simple-line-icon'
                        size={30}
                        iconStyle={styles.icon}
                        />)
                    }
                    containerStyle={styles.buttonContainer}
                    onPress={() => navigate('Categories')}
                    titleStyle={{color: '#67423C'}}
                    buttonStyle={{backgroundColor: '#D6AD85', padding: 10, paddingRight: 20,}}
                    />
                 {/* <FlatList
                    contentContainerStyle={{paddingBottom: '12%'}}
                    data={this.state.habits}
                    renderItem={renderHabit}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    horizontal={false}
                    /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFEB',
        flex: 1,
    },
    text: {
        position: 'absolute',
        top: Dimensions.get('screen').height / 100 * 40,
        left: 20,
        right: 20,
        textAlign: 'center',
        margin: 0,
        fontSize: 18,
        color: '#D6AD85',
        fontFamily: Platform.OS === 'android' ? 'serif' : 'Helvetica',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        borderRadius: 30,
        alignSelf: 'center',
    },
    icon: {
        color: '#67423C',
        marginRight: 10,
    },
});

export default HabitList;
