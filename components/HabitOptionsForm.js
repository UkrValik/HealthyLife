import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Switch, ScrollView } from 'react-native';
import { Icon, Input, CheckBox, ListItem, Button } from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';

class HabitOptionsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.route.params.name,
            goal: '1',
            checkBoxes: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
            checkBoxesOn: [],
            switchDays: false,
            switchNotification: true,
            notificationTime: [
                {
                    visible: 'none',
                    time: '6:00',
                    id: 0,
                    enabled: true,
                },
            ],
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({ 
            title: 'Healthy Life',
            headerRight: () => (
                <TouchableOpacity>
                    <Text style={styles.text}>
                        Готово
                    </Text>
                </TouchableOpacity>
            ),
        });
    }

    static navigationOptions = {
        title: 'HabitOptionsForm'
    }

    toggleCheckBox = (item) => {
        if (this.state.checkBoxesOn.find(i => i === item)) {
            let newArr = [];
            this.state.checkBoxesOn.forEach(i => {
                if (i !== item) newArr.push(i);
            });
            this.setState({ checkBoxesOn: newArr });
            this.setState({ switchDays: false });
        } else {
            this.setState({ checkBoxesOn: [...this.state.checkBoxesOn, item] });
        }
    }

    toggleSwitchDays = (value) => {
        if (this.state.checkBoxesOn.length === 7 && !value) {
            this.setState({ checkBoxesOn: [] });
        } else {
            this.setState({ checkBoxesOn: this.state.checkBoxes });
        }
        this.setState({ switchDays: value });
    }

    toggleSwitchNotification = (value) => {
        let newNotificationTime = this.state.notificationTime;
        newNotificationTime = newNotificationTime.map(i => ({
            time: i.time,
            id: i.id,
            visible: 'none',
            enabled: !i.enabled,
        }));
        this.setState({ notificationTime: newNotificationTime });
        this.setState({ switchNotification: value });
    }

    showTimePicker = (item) => {
        if (item.enabled) {
            let newNotificationTime = this.state.notificationTime;
            newNotificationTime = newNotificationTime.map(i => i.visible === 'flex' ? {
                time: i.time,
                id: i.id,
                visible: 'none',
                enabled: item.enabled,
            } : i);
            newNotificationTime = newNotificationTime.map(i => i.id === item.id ? {
                time: item.time,
                id: item.id,
                visible: item.visible === 'flex' ? 'none' : 'flex',
                enabled: item.enabled,
            } : i);
            this.setState({ notificationTime: newNotificationTime });
        }
    }

    handleTime = (hours, minutes, item) => {
        let newNotificationTime = this.state.notificationTime;
        newNotificationTime = newNotificationTime.map(i => i.id === item.id ? {
            id: item.id,
            time: hours.toString() + ':' + minutes.toString(),
            visible: item.visible,
            enabled: item.enabled,
        } : i);
        this.setState({ notificationTime: newNotificationTime });
    }

    addNotificationTime = () => {
        let newNotificationTime = this.state.notificationTime;
        newNotificationTime.push({
            time: '6:00',
            id: newNotificationTime.length,
            enabled: newNotificationTime[0].enabled,
            visible: 'none',
        });
        this.setState({ notificationTime: newNotificationTime });
    }

    render() {

        const renderCheckBoxes = ({ item }) => {
            const inputCheckBoxContainerStyle = this.state.checkBoxesOn.find(i => i === item) ?
                styles.inputCheckBoxContainerStyle1 : 
                styles.inputCheckBoxContainerStyle2;
            return (
                <TouchableOpacity 
                    key={item} 
                    style={inputCheckBoxContainerStyle} 
                    onPress={() => this.toggleCheckBox(item)}>
                    <Text style={styles.inputCheckBoxStyle}>
                        {item}
                    </Text>
                </TouchableOpacity>
            )
        }

        const ItemListHeaderComponent = () => (
            <View>
                <Text style={styles.inputCheckBoxHeaderStyle}>
                    Дни исполнения
                </Text>
            </View>
        )

        const ItemListFooterComponent = () => (
            <View style={styles.switchContainer}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.switchText}>
                        Каждый день:
                    </Text>
                </View>
                <Switch
                    value={this.state.switchDays}
                    onValueChange={(value) => this.toggleSwitchDays(value)}
                    thumbColor='#291000'
                    ios_backgroundColor='#F5E5E0'
                    trackColor={{
                        'false': '#F5E5E0',
                        'true': '#D6AD85'
                    }}
                    />
            </View>
        )

        const renderNotificationTime = ({ item }) => {
            const hours = Number.parseInt(item.time.split(':')[0]);
            const minutes = Number.parseInt(item.time.split(':')[1]);
            const color = item.enabled ? '#291000' : '#F5E5E0';
            return (
                <View key={item.id} style={{marginVertical: '0%'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, color: color, paddingLeft: '3%', fontWeight: '300', paddingVertical: 10}}>
                            Время
                        </Text>
                        <Text onPress={() => this.showTimePicker(item)} style={{fontSize: 20, color: color, marginRight: '3%', fontWeight: '300', paddingVertical: 10, paddingHorizontal: 10}}>
                            {item.time}
                        </Text>
                    </View>
                    <View style={{display: item.visible}}>
                        <TimePicker 
                            selectedHours={hours}
                            selectedMinutes={minutes}
                            onChange={(h, m) => this.handleTime(h, m, item)}
                            />
                    </View>
                </View>
            );
        }

        const NotificationFotterComponent = () => {
            return (
                <Button
                    title='Добавить еще'
                    onPress={() => this.addNotificationTime()}
                    containerStyle={{width: 90, alignSelf: 'flex-start'}}
                    buttonStyle={{backgroundColor: '#FFFFEB'}}
                    titleStyle={{color: '#291000'}}
                    />
            );
        }

        const NotificationSeparatorComponent = () => {
            return(
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#F5E5E0',
                    }}
                    />
            );
        }

        return(
            <ScrollView style={styles.container}>
                <Input
                    label='Название'
                    labelStyle={{color: '#67423C'}}
                    value={this.state.name}
                    onChangeText={(text) => this.setState({ name: text })}
                    inputStyle={styles.inputNameStyle}
                    containerStyle={{height: 70, marginTop: '3%'}}
                    inputContainerStyle={{borderColor: '#291000'}}
                    />
                <Input
                    label='Цель в день'
                    labelStyle={{color: '#67423C'}}
                    value={this.state.goal}
                    onChangeText={(text) => this.setState({ goal: text })}
                    inputStyle={styles.inputGoalStyle}
                    containerStyle={{height: 70}}
                    inputContainerStyle={{borderColor: '#291000'}}
                    />
                <View style={{width: '95%', alignSelf: 'center', borderBottomWidth: 1, paddingBottom: '2%'}}>
                    <FlatList
                        data={this.state.checkBoxes}
                        renderItem={renderCheckBoxes}
                        keyExtractor={item => item}
                        numColumns={7}
                        contentContainerStyle={{alignSelf: 'center'}}
                        scrollEnabled={false}
                        ListHeaderComponent={ItemListHeaderComponent}
                        ListFooterComponent={ItemListFooterComponent}
                        />
                </View>
                <View style={styles.notificationContainer}>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.notificationText}>
                            Оповещения
                        </Text>
                    </View>
                    <Switch
                        value={this.state.switchNotification}
                        onValueChange={(value) => this.toggleSwitchNotification(value)}
                        ios_backgroundColor='#F5E5E0'
                        thumbColor='#291000'
                        trackColor={{
                            'false': '#F5E5E0',
                            'true': '#D6AD85'
                        }}
                        />
                </View>
                <View>
                    <FlatList
                        data={this.state.notificationTime}
                        renderItem={renderNotificationTime}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                        ItemSeparatorComponent={NotificationSeparatorComponent}
                        ListFooterComponent={NotificationFotterComponent}
                        />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFEB',
        flex: 1,
    },
    inputNameStyle: {
        color: '#291000',
    },
    inputGoalStyle: {
        color: '#291000',
    },
    inputCheckBoxContainerStyle1: {
        alignItems: 'center',
        borderRadius: Dimensions.get('screen').width * 0.06,
        borderColor: '#67423C',
        borderWidth: 1.5,
        marginHorizontal: '1.9%',
        height: Dimensions.get('screen').width * 0.1,
        width: Dimensions.get('screen').width * 0.1,
        justifyContent: 'center',
        backgroundColor: '#67423C',
    },
    inputCheckBoxContainerStyle2: {
        alignItems: 'center',
        borderRadius: Dimensions.get('screen').width * 0.06,
        borderColor: '#67423C',
        borderWidth: 1.5,
        marginHorizontal: '1.9%',
        height: Dimensions.get('screen').width * 0.1,
        width: Dimensions.get('screen').width * 0.1,
        justifyContent: 'center',
        backgroundColor: '#FFFFEB'
    },
    inputCheckBoxStyle: {
        color: '#D6AD85',
    },
    inputCheckBoxHeaderStyle: {
        color: '#67423C',
        fontWeight: 'bold',
        marginLeft: '0.5%',
        fontSize: 16,
        marginBottom: '3%',
    },
    text: {
        padding: 10,
        fontFamily: Platform.OS === 'android' ? 'serif' : 'Helvetica',
        color: '#67423C',
        fontSize: 21,
        fontWeight: '400',
    },
    switchContainer: {
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    switchText: {
        fontSize: 16,
        textAlignVertical: 'center',
        color: '#291000',
    },
    notificationContainer: {
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: '2%',
    },
    notificationText: {
        color: '#67423C',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: '3%',
        paddingLeft: '3%',
    }
});

export default HabitOptionsForm;
