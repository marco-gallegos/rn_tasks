import React from 'react'
import { View, Text, FlatList } from 'react-native'
import storage from '../storage/local'
import axios from 'axios'

export default function Tasks() {
    const [token, setToken] = React.useState(null)
    const [tasks, setTasks] = React.useState(null)

    // on mount
    React.useEffect(function () {

        //setTasks(null)
        
        storage.load({
            key:'user',
            id:'1001'
        }).then(ret => {
            console.info('cargado el token from task')
            console.info(ret)

            setToken(ret)

        }).catch(err => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                // TODO;
                break;
                case 'ExpiredError':
                // TODO
                break;
            }
        });
    },[])

    // on update param var
    React.useEffect(() => {
        if(token){
            axios.get('http://192.168.0.111:5050/api/task',
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(response => {
                console.log(response.data)
                setTasks(response.data)
            }).catch(error => {
                console.error("no se tienen tasks")
                console.error(error)
            })
        }
    }, [token]);

    return (
        <>
            <View>
                <Text>Hola tasks</Text>
            </View>
            <View>
                <FlatList
                    data={tasks}
                    renderItem={({item}) => <Text>{ `${item.id} -- ${item.description}` }</Text>}
                />
            </View>
        </>
    )
}
