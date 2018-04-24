# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180420021359) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"
  enable_extension "pgcrypto"
  enable_extension "citext"

  create_table "activities", force: :cascade do |t|
    t.string "user_id"
    t.integer "model_id"
    t.string "action"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "authors", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.citext "name"
    t.citext "name_vn"
    t.citext "description"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_authors_on_name"
    t.index ["name_vn"], name: "index_authors_on_name_vn"
  end

  create_table "categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.boolean "public", default: false
    t.integer "like_c", default: 0
    t.integer "rating", default: 0
    t.integer "visited", default: 0
    t.integer "post_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "chapters", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.citext "title", null: false
    t.string "origin_content"
    t.string "content"
    t.boolean "public", default: false
    t.string "translator", default: "f"
    t.string "editor", default: "f"
    t.string "approve_by", default: "f"
    t.string "image"
    t.integer "like_c", default: 0
    t.integer "rating", default: 0
    t.integer "visited", default: 0
    t.text "description"
    t.string "origin_link"
    t.integer "post_id"
    t.integer "order_c"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "post_id", limit: 2
    t.integer "chapter_id", limit: 2
    t.integer "user_id"
    t.text "content"
    t.integer "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
  end

  create_table "post_categories", force: :cascade do |t|
    t.integer "post_id"
    t.integer "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.citext "title", null: false
    t.citext "title_vn", null: false
    t.string "origin_link", null: false
    t.string "origin_rs", null: false
    t.integer "author_id"
    t.citext "author_name_vn"
    t.citext "description"
    t.boolean "public", default: false
    t.string "origin_img"
    t.string "images"
    t.integer "chapter_count", default: 0
    t.string "status"
    t.string "assign_to", default: "f"
    t.integer "like_c", default: 0
    t.integer "rating", default: 0
    t.integer "visited", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_name_vn"], name: "index_posts_on_author_name_vn"
    t.index ["title"], name: "index_posts_on_title"
    t.index ["title_vn"], name: "index_posts_on_title_vn"
  end

  create_table "type_posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "post_id"
    t.integer "type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "types", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_types_on_name"
  end

  create_table "user_reports", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "post_id", limit: 2
    t.integer "chapter_id", limit: 2
    t.integer "user_id"
    t.text "description"
    t.string "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.citext "email", default: "", null: false
    t.string "phone", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "birthday"
    t.integer "sex", limit: 2, default: 0
    t.citext "full_name"
    t.string "role", limit: 10, default: "user"
    t.boolean "enable", default: false
    t.string "provider"
    t.string "avatar"
    t.jsonb "setting", default: {}, null: false
    t.jsonb "detail", default: {}, null: false
    t.citext "visited"
    t.citext "country"
    t.citext "province"
    t.citext "district"
    t.citext "detail_address"
    t.integer "status", limit: 2, default: 0
    t.string "oauth_token"
    t.datetime "oauth_expires_at"
    t.string "app_token", limit: 32
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone"], name: "index_users_on_phone", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
