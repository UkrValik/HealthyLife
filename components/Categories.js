import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {
                    id: 0,
                    name: 'Здоровье',
                    icon: 'heart',
                },
                {
                    id: 1,
                    name: 'Продуктивность',
                    icon: 'hand-o-up'
                },
                {
                    id: 2,
                    name: 'Развитие',
                    icon: 'arrow-up',
                },
                {
                    id: 3,
                    name: 'Спорт',
                    icon: 'bicycle',
                },
                {
                    id: 4,
                    name: 'Учеба',
                    icon: 'book',
                }
            ]
        };
    }

    static navigationOptions = {
        title: 'Categories',
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#204051',
                }}
                />
        );
    }

    FlatListHeaderComponent = () => {
        return (
            <Text style={{color: '#3b6978', alignSelf: 'center'}}>
                виберите категорию или создайте собственную
            </Text>
        );
    }

    render() {

        const renderCategory = ({ item }) => (
            <View key={item.id}>
                <ListItem
                    containerStyle={styles.listItem}
                    titleStyle={{color: '#204051'}}
                    title={item.name}
                    rightIcon={() => (<Icon name='arrow-circle-right' type='font-awesome' color='#3b6978' size={24} />)}
                    leftIcon={() => (<Icon name={item.icon} type='font-awesome' color='#3b6978' size={24} />)}
                    />
            </View>
        )

        return(
            <FlatList
                contentContainerStyle={styles.container}
                data={this.state.categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                ListHeaderComponent={this.FlatListHeaderComponent}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffe196',
        flex: 1,
    },
    text: {
        margin: 0,
        fontSize: 22,
        color: '#204051',
        fontFamily: Platform.OS === 'android' ? 'serif' : 'Marker Felt'
    },
    listItem: {
        backgroundColor: '#84a9ac',
        padding: 10,
        margin: 5,
    }
});

export default Categories;
