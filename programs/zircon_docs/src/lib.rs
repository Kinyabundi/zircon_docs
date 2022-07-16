use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

declare_id!("2Qk4D7V8qdbUL2PQNgRKT19VCM8jwRLycTw2WeY9r1ed");

// Constants
const USER_NAME_LENGTH: usize = 50;
const USER_EMAIL_LENGTH: usize = 100;
const USER_PHONENO_LENGTH: usize = 20;
const USER_ACCOUNT_TYPE_LENGTH: usize = 20;
const MAX_REQUEST_MESSAGE_LENGTH: usize = 1024;


#[program]
pub mod zircon_docs {
    use super::*;

    pub fn create_state(
        ctx: Context<CreateState>
    ) -> Result<()> {
        // Get the state from the context
        let state = &mut ctx.accounts.state;

        // Save the authority to the state
        state.authority = ctx.accounts.authority.key();

        // Initizalize the request count
        state.request_count = 0;

        // Return success
        Ok(())
    }

    pub fn create_user(
        ctx: Context<CreateUser>,
        name: String,
        email: String,
        phoneno: String,
    ) -> Result<()> {
        // Get the user from the context
        let user = &mut ctx.accounts.user;
        // set the authority (wallet_address)
        user.user_wallet_address = ctx.accounts.authority.key();
        // set the user name
        user.name = name;
        // set the user email
        user.email = email;
        // set the user phoneno
        user.phoneno = phoneno;

        // Return success
        Ok(())
    }

    // Create a new request
    pub fn create_request(
        ctx: Context<CreateRequest>,
        request_message: String,
        request_author: String,
        request_address_to: Pubkey,
        request_status: String,
    ) -> Result<()> {
        // Get the state first
        let state = &mut ctx.accounts.state;
        // Get the request from the context
        let request = &mut ctx.accounts.request;

        // set the request authority
        request.authority = ctx.accounts.authority.key();
        // set the request message
        request.request_message = request_message;
        // set the request author
        request.request_author = request_author;
        // initialize the request reply count
        request.request_reply_count = 0;
        // set the request address to
        request.request_address_to = request_address_to;
        // set the request status
        request.request_status = request_status;
        // set the request index
        request.request_index = state.request_count;
        // set the request timestamp
        request.request_time = ctx.accounts.clock.unix_timestamp;


        // increment the request count in state
        state.request_count += 1;

        // Return success
        Ok(())
    }

    // Create a new reply message of a given request
    pub fn create_reply_message(
        ctx: Context<CreateReplyMessage>,
        reply_message_content: String,
        reply_author: String,
    ) -> Result<()> {
        // get the request first
        let request = &mut ctx.accounts.request;
        // get the request reply message from the context
        let reply_message = &mut ctx.accounts.reply_message;
        // set the authority
        reply_message.authority = ctx.accounts.authority.key();
        // set the reply message
        reply_message.reply_message_content = reply_message_content;
        // set the reply author
        reply_message.reply_author = reply_author;
        // set the reply index
        reply_message.reply_index = request.request_reply_count;
        // set the reply timestamp
        reply_message.reply_time = ctx.accounts.clock.unix_timestamp;
        // increment the request reply count
        request.request_reply_count += 1;
        // Return success
        Ok(())
    }

    // Create a new reply document of a given request
    pub fn create_reply_document(
        ctx: Context<CreateReplyDocument>,
        reply_document_message_content: String,
        reply_author: String,
        reply_document_name: String,
        reply_document_hash: String,
    ) -> Result<()> {
        // get the request first
        let request = &mut ctx.accounts.request;
        // get the request reply document from the context
        let reply_document = &mut ctx.accounts.reply_document;
        // set the authority
        reply_document.authority = ctx.accounts.authority.key();
        // set the reply document message content
        reply_document.reply_document_message_content = reply_document_message_content;
        // set the reply author
        reply_document.reply_author = reply_author;
        // set the reply document url
        reply_document.reply_document_name = reply_document_name;
        // set the reply document hash
        reply_document.reply_document_hash = reply_document_hash;
        // set the reply index
        reply_document.reply_index = request.request_reply_count;
        // set the reply timestamp
        reply_document.reply_time = ctx.accounts.clock.unix_timestamp;
        // increment the request reply count
        request.request_reply_count += 1;
        // Return success
        Ok(())
    }

    // Update the request status
    pub fn update_request_status(
        ctx: Context<UpdateRequestStatus>,
        request_status: String,
    ) -> Result<()> {
        // get the request first
        let request = &mut ctx.accounts.request;
        // update the request status
        request.request_status = request_status;
        // Return success
        Ok(())
    }


    
}

// Create State
#[derive(Accounts)]
pub struct CreateState<'info> {
    // Authenticate the state account
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8 // size of state account and add 8 bytes for the discriminator
    )]
    pub state: Account<'info, StateAccount>,

    // Authorize the create state transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,
}

// Create User
#[derive(Accounts)]
pub struct CreateUser<'info> {
    // Authenticate the user account
    #[account(
        init,
        seeds = [b"user".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = size_of::<UserAccount>() + USER_NAME_LENGTH + USER_EMAIL_LENGTH + USER_ACCOUNT_TYPE_LENGTH + USER_PHONENO_LENGTH + 8 // size of user account and add 8 bytes for the discriminator
    )]
    pub user: Account<'info, UserAccount>,
    // Authorize the create user transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,

    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the timestamp of the user creation
    pub clock: Sysvar<'info, Clock>,
}

// Create Request
#[derive(Accounts)]
pub struct CreateRequest<'info> {
    // Authenticate the state account
    #[account(
        mut,
        seeds = [b"state".as_ref()],
        bump,
    )]
    pub state: Account<'info, StateAccount>,

    // Authenticate the request account
    #[account(
        init,
        seeds = [b"request".as_ref(), state.request_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<RequestAccount>() + USER_NAME_LENGTH + USER_EMAIL_LENGTH + USER_ACCOUNT_TYPE_LENGTH + 8 + 32 + MAX_REQUEST_MESSAGE_LENGTH // size of request account and add 8 bytes for the discriminator
    )]
    pub request: Account<'info, RequestAccount>,
    // Authorize the create request transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,

    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the timestamp of the request creation
    pub clock: Sysvar<'info, Clock>,
}

// Update Request status
#[derive(Accounts)]
pub struct UpdateRequestStatus<'info> {
    // get the request first
    #[account(mut)]
    pub request: Account<'info, RequestAccount>,
    // Authorize the update request status transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,

    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the timestamp of the request status update
    pub clock: Sysvar<'info, Clock>,
}

// Create Reply Message
#[derive(Accounts)]
pub struct CreateReplyMessage<'info> {
    // Authenticate the request account
    #[account(
        mut,
        seeds = [b"request".as_ref(), request.request_index.to_be_bytes().as_ref()],
        bump,
    )]
    pub request: Account<'info, RequestAccount>,
    // Authenticate the reply message account
    #[account(
        init,
        seeds = [b"reply_message".as_ref(), request.request_index.to_be_bytes().as_ref(), request.request_reply_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<ReplyMessageAccount>() + USER_NAME_LENGTH + USER_EMAIL_LENGTH + USER_ACCOUNT_TYPE_LENGTH + 8 + 32 + MAX_REQUEST_MESSAGE_LENGTH // size of reply message account and add 8 bytes for the discriminator
    )]
    pub reply_message: Account<'info, ReplyMessageAccount>,
    // Authorize the create reply message transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,

    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the timestamp of the reply message creation
    pub clock: Sysvar<'info, Clock>,
}

// Create Reply Document
#[derive(Accounts)]
pub struct CreateReplyDocument<'info> {
    // Authenticate the request account
    #[account(
        mut,
        seeds = [b"request".as_ref(), request.request_index.to_be_bytes().as_ref()],
        bump,
    )]
    pub request: Account<'info, RequestAccount>,
    // Authenticate the reply document account
    #[account(
        init,
        seeds = [b"reply_document".as_ref(), request.request_index.to_be_bytes().as_ref(), request.request_reply_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<ReplyDocumentAccount>() + USER_NAME_LENGTH + USER_EMAIL_LENGTH + USER_ACCOUNT_TYPE_LENGTH + 8 + 32 + MAX_REQUEST_MESSAGE_LENGTH // size of reply document account and add 8 bytes for the discriminator
    )]
    pub reply_document: Account<'info, ReplyDocumentAccount>,
    // Authorize the create reply document transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,
    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
    // Clock to save the timestamp of the reply document creation
    pub clock: Sysvar<'info, Clock>,
}


// State Account
#[account]
pub struct StateAccount {
    // Signer address
    pub authority: Pubkey,
    // Request count
    pub request_count: u64,
}

// User Account
#[account]
pub struct UserAccount {
    // user wallet address
    pub user_wallet_address: Pubkey,
    // User email
    pub email: String,
    // User name
    pub name: String,
    // User phone number
    pub phoneno: String,
}

// Request Account
#[account]
pub struct RequestAccount {
    // authority
    pub authority: Pubkey,
    // request message
    pub request_message: String,
    // request author
    pub request_author: String,
    // request reply count
    pub request_reply_count: u64,
    // request index
    pub request_index: u64,
    // request address to
    pub request_address_to: Pubkey, // this is the address to which the request is sent
    // request status
    pub request_status: String, // this is the status of the request (pending, accepted, rejected)
    // request time
    pub request_time: i64, // this is the time at which the request was created
}

// Reply Message Account when requesting for maybe additional information
#[account]
pub struct ReplyMessageAccount {
    // authority
    pub authority: Pubkey,
    // reply message
    pub reply_message_content: String,
    // reply author
    pub reply_author: String,
    // reply index
    pub reply_index: u64,
    // reply time
    pub reply_time: i64,
}

// Reply Document Account when sending back the documents to the requesting party
#[account]
pub struct ReplyDocumentAccount {
    // authority
    pub authority: Pubkey,
    // reply document messages
    pub reply_document_message_content: String,
    // reply document url
    pub reply_document_name: String,
    // reply document hash
    pub reply_document_hash: String,
    // reply author
    pub reply_author: String,
    // reply index
    pub reply_index: u64,
    // reply time
    pub reply_time: i64,
}