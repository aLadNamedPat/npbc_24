module module_addr::DatasetLabeling {
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin::Coin;
    use std::timestamp;
    use std::signer;
    use std::vector;
    use std::option::Option;
    use aptos_framework::account;
    
    struct DatasetSubmission has key, store {
        ipfs_hash: vector<u8>,
        cost: u64,
        submitter: address,
        completed: bool
    }

    public fun finish_dataset(account: &signer, cost: u64, ady : address){
        let submitter = signer::address_of(account);
        let payment = coin::withdraw<AptosCoin>(account, cost);
        coin::deposit<AptosCoin>(ady, payment);
    }

    const SERVICE_FEE: u64= 1000;
    public fun submit_dataset(account: &signer) {
        let submitter = signer::address_of(account);
        let payment = coin::withdraw<AptosCoin>(account, SERVICE_FEE);
        coin::deposit<AptosCoin>(service_address(), payment);
    }


    // struct ContractBalance has key {
    //     balance: coin::Coin<AptosCoin>,
    // }

    // public fun initialize(account: &signer) {
    //     let initial_balance = coin::withdraw<AptosCoin>(account, 0); // Withdraw 0 as an example to initialize
    //     move_to(account, ContractBalance{ balance: initial_balance });
    // }

    // // struct MyCoinStore has key {
    // //     balance: coin::Coin<AptosCoin>,
    // // }

    // // const LABELING_PERIOD: u64 = 604800; // Labeling period in seconds (e.g., one week)
    // // // const NO_LABELER: address = 0x0;
    // // const SERVICE_FEE: u64 = 1000;  // Fixed fee for using the service, denoted in micro Aptos (1 APT = 1,000,000 micro Aptos).

    // // struct LabelingTask has key {
    // //     dataset_id: u64,
    // //     labeler: address,
    // //     // Additional fields as needed
    // // }

    // // public fun initialize_coin_store(account: &signer) {
    // //     let initial_balance = coin::Coin<AptosCoin> { value : 0 };
    // //     let coin_store = MyCoinStore { balance: initial_balance};
    // //     move_to(account, coin_store);
    // // }
    
    // // public fun withdraw_from_store(account: &Signer): coin::Coin<AptosCoin> {
    // //     let coin_store = borrow_global_mut<MyCoinStore>(Signer::address_of(account));
    // //     // Perform logic to ensure `amount` can be withdrawn
    // //     // This example directly returns the balance for simplicity but doesn't match actual Aptos API usage
    // //     coin_store.balance
    // // }

    // // public fun setup_account(account: &signer) {
    // //     coin::register<AptosCoin>(account);
    // // }

    // // public fun submit_dataset(account: &signer, ipfs_hash: vector<u8>, cost: u64) acquires DatasetSubmission {
    // //     initialize_coin_store(account);
    // //     let submitter = signer::address_of(account);
    // //     let now = timestamp::now_seconds();
    // //     let deadline = now + LABELING_PERIOD;
    // //     let total_amount = cost + SERVICE_FEE;

    // //     let payment = coin::withdraw<AptosCoin>(account, total_amount);
    // //     coin::deposit<AptosCoin>(Self::service_address(), payment);

    // //     let submission = DatasetSubmission {
    // //         ipfs_hash: ipfs_hash,
    // //         cost: cost,
    // //         submitter: submitter,
    // //         deadline: deadline,
    // //         labeler: Self::null_address()
    // //     };

    // //     move_to(account, submission);
    // // }

    // // // A function to be called when a labeling task is completed
    // // public fun complete_labeling_task(submitter: address, account: &signer, dataset_id: u64, labeler: &signer) acquires DatasetSubmission {
    // //     let submission = borrow_global_mut<DatasetSubmission>(submitter);
    // //     let coins = borrow_global_mut<MyCoinStore>(submitter);

    // //     // Check if the submission has already been labeled or if the deadline has passed.
    // //     assert!(submission.labeler == Self::null_address(), 1); // Error if already labeled.
    // //     assert!(timestamp::now_seconds() <= submission.deadline, 2); // Error if deadline passed.

    // //     // Transfer the cost to the labeler, excluding the service fee.
    // //     let labeler_address = signer::address_of(labeler);
    // //     coin::deposit<AptosCoin>(labeler_address, withdraw_from_store(account)); 
    // //     submission.labeler = submitter;
    // // }

    // // public fun refund(account: &signer, submitter: address, dataset_id: u64) acquires DatasetSubmission {
    // //     let submission = borrow_global_mut<DatasetSubmission>(submitter);
    // //     let coins = borrow_global_mut<MyCoinStore>(submitter);
    // //     assert(submission.labeler == Self::null_address(), 403); // Check if not already labeled
    // //     assert(timestamp::now_seconds() > submission.deadline, 406); // Check deadline passed

    // //     // Refund the cost to the submitter
    // //     // Transfer the cost to the labeler, excluding the service fee.
    // //     coin::deposit<AptosCoin>(Self::module_address(), withdraw_from_store(account))

    // //     // Optionally, remove the submission from storage
    // // }

    // // public fun submit_dataset(account: &signer, ipfs_hash: vector<u8>, cost: u64) acquires DatasetSubmission {
    // //     let payment = coin::withdraw<AptosCoin>(account, SERVICE_FEE);
    // //     coin::deposit<AptosCoin>(Self::service_address(), payment);

    // //     let submission = DatasetSubmission {
    // //         ipfs_hash: ipfs_hash,
    // //         cost: cost,
    // //         submitter: submitter,
    // //     };

    // //     move_to(account, submission);
    // // }

    // struct VestingSchedule has key, store {
    //     sender: address,
    //     receiver: address,
    //     release_times: vector<u64>,
    //     release_amounts: vector<u64>,
    //     total_amount: u64,
    //     released_amount: u64,
    // }

    // struct EscrowAccount has key {
    //     // This could represent the total amount or other relevant escrow information
    //     total_amount: u64,
    // }

    // public fun submit_dataset(account: &signer, ipfs_hash: vector<u8>, cost: u64) {
    //     initialize(account)
    //     let submitter = signer::address_of(account);
    //     let payment = coin::withdraw<AptosCoin>(account, SERVICE_FEE);
    //     coin::deposit<AptosCoin>(Self::service_address(), payment);

    //     let submission = DatasetSubmission {
    //         ipfs_hash: ipfs_hash,
    //         cost: cost,
    //         submitter: submitter,
    //     };

    //     move_to(account, submission);
    // }

    // public fun initialize_escrow(account: &signer, total_amount: u64) {
    //     // Use the account module to create a new resource account
    //     let (escrow, _cap) = account::create_resource_account(account, b"escrow");
    //     let escrow_signer = account::create_signer_with_capability(&_cap);

    //     // Initialize the EscrowAccount resource with the total amount
    //     move_to(&escrow_signer, EscrowAccount { total_amount });

    //     // Deposit the initial total amount into the escrow account
    //     // This assumes the signing account has enough balance
    //     let initial_deposit = coin::withdraw<AptosCoin>(account, total_amount);
    //     coin::deposit(Signer::address_of(&escrow_signer), initial_deposit);
    // }

    // // A function to be called when a labeling task is completed
    // public fun complete_labeling_task(labeler: &signer, acc: address, dataset_id: u64) acquires DatasetSubmission {
    //     let dataset_submission = borrow_global_mut<DatasetSubmission>(acc);
    //     let vesting_data = borrow_global_mut<VestingSchedule>(vesting_address); 
        
    //     let vesting_signer_from_cap = account::create_signer_with_capability(&vesting_data.resource_cap);
    //     let withdrawal = coin::withdraw<AptosCoin>(vesting_signer_from_cap, dataset_submission.cost)       
    //     let labeler_address = signer::address_of(labeler);
    //     coin::deposit<AptosCoin>(labeler_address, withdrawal); 
    // }

    
    // public fun module_address(): address {
    //     @0x7ace233db888c0a18caecd373b9ad5ffeb2a55901dee7a728e21da0b4b500d7a
    // }

    public fun service_address() : address {
        @0x4fc3338dd407a69a518aac33eb2a28129cbea7903963fa6e463d3439a34df42b
    }
}
