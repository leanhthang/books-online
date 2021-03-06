# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    enable_extension 'citext'
    create_table :users, id: :uuid do |t|
      ## Database authenticatable
      t.citext :email,              null: false, default: ""
      t.string :phone,              null: false, default: "", :minimum => 9, :maximum => 12

      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      ## Confirmable
      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable

      ## Lockable
      # t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at

      t.string   :birthday, null: false
      # t.attachment :avatar
      t.integer  :sex, default: 0, limit: 1

      t.citext    :full_name
      # admin, editor, user
      t.string    :role, limit: 10, default: 'user'
      t.boolean   :enable, default: false
      t.string    :birthday
      t.string    :avatar
      t.jsonb     :setting, null: false, default: {}

      t.string    :provider
      t.jsonb     :detail, null: false, default: {}

      t.citext   :visited
      # User address
      t.citext   :country
      t.citext   :province
      t.citext   :district
      t.citext   :detail_address
      # t.string  :permission, default: '00000', limit: 1
      t.integer  :status, default: 0, limit: 1

      t.string    :oauth_token
      t.datetime  :oauth_expires_at
      t.string    :app_token, limit: 32

      t.timestamps null: false
    end

    add_index :users, :phone,                unique: true
    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
