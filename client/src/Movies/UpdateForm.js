import React, {useState, useEffect} from 'react';
import axios from 'axios';

const intialState = {id: 0, title: '', director: '', metascore: 0, stars: []};
const UpdateForm = props => {
    console.log(props)
    const[update, setUpdate] = useState(intialState)
    const fetchMovie = id => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=> {
            console.log('response in update form', res)
            setUpdate({...res.data, id: id});
        })
        .catch(err => console.log(err.response));
    }
    useEffect(()=> {
        fetchMovie(props.match.params.id);
    }, [])
    const handleChange = e => {
        setUpdate({...update, [e.target.name]: e.target.value})
    }
    const handleChangeStars = (e, i) => {
        let starsChange = update.stars.slice();
        starsChange[i] = e.target.value;
        setUpdate({...update, stars: starsChange});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, update)
        .then(res => {
            console.log(res);
            setUpdate(intialState)
            props.history.push('/')
        })
        .catch(err => console.log("error", err.response));
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    title
                    <input 
                        type="text"
                        name="title"
                        placeholder="movie title"
                        value={update.title}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="director">
                    director
                    <input 
                        type="text"
                        name="director"
                        placeholder="director"
                        value={update.director}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="metascore">
                    metascore
                    <input 
                        type="text"
                        name="metascore"
                        placeholder="metascore"
                        value={update.metascore}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="stars">
                    stars
                    {update.stars.map((star, i)=> {
                        return (
                            <div key={star}>
                                <input 
                                type="text"
                                name={`stars`}
                                value={star}
                                onChange={(e)=> handleChangeStars(e, i)}
                                
                                />
                            </div>
                        )
                    })}
                </label>
               <button>update</button>
            </form>
        </div>
    )
}

export default UpdateForm;