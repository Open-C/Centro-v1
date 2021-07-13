import { connect } from "svelte-redux-connect";
import Wallet from "../components/Wallet.svelte";
import { connectWallet } from "../redux/wallet_store";
const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  connect: (walletProviderName) => connectWallet(dispatch, walletProviderName),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
