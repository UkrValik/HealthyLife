import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Switch } from 'react-native';
import { Icon, Input, CheckBox } from 'react-native-elements';

class HabitOptionsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.route.params.name,
            goal: '1',
            checkBoxes: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
            checkBoxesOn: [],
            switch: false,
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
        } else {
            this.setState({ checkBoxesOn: [...this.state.checkBoxesOn, item] });
        }
    }

    toggleSwitch = (value) => {
        this.setState({ switch: value });
        if (value) {
            this.setState({ checkBoxesOn: this.state.checkBoxes });
        } else {
            this.setState({ checkBoxesOn: [] });
        }
    }

    render() {

        const renderCheckBoxes = ({ item }) => {
            const inputCheckBoxContainerStyle = this.state.checkBoxesOn.find(i => i === item) ?
                styles.inputCheckBoxContainerStyle1 : 
                styles.inputCheckBoxContainerStyle2;
            return (
                <TouchableOpacity key={item} style={inputCheckBoxContainerStyle} onPress={() => this.toggleCheckBox(item)}>
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
            <View style={{marginTop: '2%', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 16, textAlignVertical: 'center', color: '#291000'}}>
                    Каждый день:
                </Text>
                <Switch
                    style={{}}
                    value={this.state.switch}
                    onValueChange={(value) => this.toggleSwitch(value)}
                    thumbColor='#291000'
                    ios_backgroundColor='#F5E5E0'
                    trackColor={{
                        'false': '#F5E5E0',
                        'true': '#D6AD85'
                    }}
                    />
            </View>
        )

        return(
            <View style={styles.container}>
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
                <View style={{flex: 1}}>
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
            </View>
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
        backgroundColor: '#67423C'
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
        marginLeft: '1%',
        fontSize: 16,
        marginBottom: '3%',
    },
    text: {
        padding: 10,
        fontFamily: Platform.OS === 'android' ? 'serif' : 'Helvetica',
        color: '#67423C',
        fontSize: 21,
        fontWeight: '400',
    }
});

export default HabitOptionsForm;
