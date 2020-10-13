import React from "react";
import Page from "../../components/Page";
import { PRODUCTS_ARR, INGREDIENTS_ARR } from "../../constants/data";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { validateAddToCartPredefined } from "../../utils/validationHelpers";
import { addPredefinedCoffee } from "../../redux/actions/cartActions";

import Head from "next/head";
import { ListGroup, Container, Image, Button } from "react-bootstrap";
import styles from "../../styles/ProductDetails.module.css";

const mapStateToProps = (state) => {
	return {
		productsInCart: state.cart.cart,
		stock: state.cart.stock,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addPredefinedCoffee: (payload) => dispatch(addPredefinedCoffee(payload)),
	};
};

const ProductDetails = (props) => {
	const { addPredefinedCoffee, productsInCart, stock } = props;

	const router = useRouter();
	const productID = router.query.productdetails;
	const product = PRODUCTS_ARR.find((product) => product.id === productID);
	const recipe = [];
	// if (product) {
	INGREDIENTS_ARR.forEach((ingredient) => {
		if (product.recipe.includes(ingredient.id)) {
			recipe.push(ingredient.label);
		}
	});
	// }

	const addPredefined = (product) => {
		if (validateAddToCartPredefined(product.id, productsInCart, stock)) {
			addPredefinedCoffee(product);
		}
	};

	return (
		<div>
			{product && (
				<>
					<Head>
						<title>{product.label}</title>
						<link rel='icon' href='/favicon.ico' />
						<link
							href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
							rel='stylesheet'
						/>
					</Head>

					<Page>
						<Container>
							<h2 className={styles.title}>{`${product.label}`}</h2>
							<div className={styles.bigWrapper}>
								<div className={styles.listWrapper}>
									<ListGroup variant='flush' className={styles.recipeList}>
										{recipe.map((ingredient, idx) => {
											return (
												<ListGroup.Item
													key={idx}
													style={{
														backgroundColor: "#E4D9C5",
														border: "none",
													}}>
													{ingredient}
												</ListGroup.Item>
											);
										})}
									</ListGroup>
									<Button
										variant='dark'
										className={styles.addBtn}
										onClick={() => addPredefined(product)}>
										Add to cart
									</Button>
								</div>
								<Image
									src='http://t0.gstatic.com/images?q=tbn:ANd9GcTQhEuCyNU_2t8HXuGGSAODNGQhigx21H0VbVWPjMG3qouOOafTZgOaOMoFKsTyBkasAQrvTH4Iu8YTiQmbH_o'
									fluid
									className={styles.coffeeImg}
								/>
							</div>
						</Container>
					</Page>
				</>
			)}
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
