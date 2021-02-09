import _ from 'lodash'
import React, { Component } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import Images from '../../assets/images'
import { CharacterListFooter, CharactersListHeader, Header, InformationBar, MovieDetails } from '../../components'
import { ContainerActions, NetworkActions } from '../../state/src'
import Styles from './Styles'

// A Container of Components that renders the app + the logic of the app

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			characters: [],
			hasSelectedMovie: false,
			isAllTabActive: true,
			isAscendingOrder: true,
			isFemaleTabActive: false,
			isMaleTabActive: false,
			isVisibleMovieList: false,
			selectedMovie: null,
		}
	}

	async componentDidMount() {
		await this.getMoviesRequest()
	}

	setSelectedMovie = ({ item }) => {
		this.setState((prevState) => ({
			selectedMovie: item,
			hasSelectedMovie: !prevState.hasSelectedMovie,
		}))
		this.toggleMovieList()
	}

	toggleMovieList = () => {
		this.setState((prevState) => ({
			isVisibleMovieList: !prevState.isVisibleMovieList,
		}))
		this.getCharacterDetails()
	}

	getMoviesRequest = async () => {
		const { getMoviesRequest, moviesUpdate } = this.props

		try {
			const { results } = await getMoviesRequest()

			moviesUpdate({
				movies: results,
			})
		} catch (error) {
			this.onFailure(error)
		}
	}

	displayMovieList = () => {
		const { movies } = this.props

		const sortedMovies = movies.sort((a, b) => {
			return new Date(a.release_date) - Date(b.release_date)
		})

		return (
			<FlatList
				data={sortedMovies}
				keyExtractor={(item) => item.episode_id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity style={Styles.item} onPress={() => this.setSelectedMovie({ item })}>
						<Text style={Styles.movieTitleText}>{item.title}</Text>
						<Image source={Images.arrowRight} />
					</TouchableOpacity>
				)}
			/>
		)
	}

	// Fetching character data from url
	fetchPerson = (url) => {
		return fetch(url)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				return { ...data, url }
			})
			.catch((e) => {
				console.log(e)
			})
	}

	// getting character details  for each character
	// using a map function to by pass async-await unaware looping
	getCharacterDetails = async () => {
		const { selectedMovie } = this.state

		const characters = selectedMovie?.characters

		if (selectedMovie && !_.isEmpty(characters)) {
			const actors = await characters.map(async (character) => {
				const person = await this.fetchPerson(character)
				return person
			})

			const parsedCharacters = await Promise.all(actors)

			return parsedCharacters
		}
	}

	displayCharacters = async () => {
		try {
			const response = await this.getCharacterDetails()
			const parsedCharacters = await Promise.all(response)

			this.setState({ characters: parsedCharacters })
		} catch (error) {
			this.onFailure(error)
		}
	}

	toggleCharacterOrder = () => {
		this.setState((prevState) => ({
			isAscendingOrder: !prevState.isAscendingOrder,
		}))
	}

	renderBody = () => {
		const {
			isVisibleMovieList,
			selectedMovie,
			isMaleTabActive,
			isFemaleTabActive,
			isAllTabActive,
			isAscendingOrder,
			characters,
		} = this.state

		try {
			this.displayCharacters()
		} catch (error) {
			this.onFailure(error)
		}

		let totalHeight = characters.reduce((result, element) => {
			return Number(result) + Number(element.height)
		}, 0)

		return (
			<>
				<Header children="StarWars Wiki" />
				<InformationBar
					hasIcon
					clickedImageSource={Images.arrowDown}
					isInformationVisible={isVisibleMovieList}
					text={selectedMovie ? selectedMovie?.title : 'FILMS'}
					unclickedImageSource={Images.arrowRight}
					onPress={this.toggleMovieList}
				/>

				<>
					<View style={Styles.background}>
						{isVisibleMovieList ? (
							this.displayMovieList()
						) : selectedMovie ? (
							<>
								<MovieDetails
									isAllTabActive={isAllTabActive}
									isCharactersInAscendingOrder={isAscendingOrder}
									isFemaleTabActive={isFemaleTabActive}
									isMaleTabActive={isMaleTabActive}
									key={1}
									movieCrawl={selectedMovie?.crawl}
									movieTitle={selectedMovie?.title}
								/>
								<CharactersListHeader onPress={this.toggleCharacterOrder} />
								<View style={Styles.flatListContainer}>
									{_.isEmpty(characters) ? (
										<Image
											source={Images.spinner}
											style={{ alignSelf: 'center', justifyContent: 'center', width: 50, height: 50 }}
										/>
									) : (
										<FlatList
											data={_.sortBy(characters, ['name'])}
											extraData={_.sortBy(characters, ['name'])}
											inverted={!isAscendingOrder}
											keyExtractor={(item, index) => `key-${index}`}
											renderItem={({ item }) => (
												<View style={Styles.characterContainer} onPress={() => null}>
													<View style={Styles.characterItem}>
														<Text style={Styles.characterText}>{item.name}</Text>
													</View>
													<View style={Styles.characterItem}>
														<Text style={Styles.characterText}>{item.gender}</Text>
													</View>
													<View style={Styles.characterItem}>
														<Text style={Styles.characterText}>{item.height}</Text>
													</View>
												</View>
											)}
										/>
									)}
								</View>
								<CharacterListFooter totalCharacters={characters.length} totalHeight={totalHeight} />
							</>
						) : (
							<Image resizeMode="contain" source={Images.starWarsLogo} style={Styles.logo} />
						)}
					</View>
				</>
			</>
		)
	}

	render() {
		return this.renderBody()
	}
}

const mapStateToProps = (state) => ({
	movies: state.container.movies.movies,
})

const mapDispatchToProps = (dispatch) => ({
	getMoviesRequest: (payload) => dispatch(NetworkActions.getMoviesRequest(payload)),
	moviesUpdate: (payload) => dispatch(ContainerActions.moviesUpdate(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
