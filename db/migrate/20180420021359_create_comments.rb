class CreateComments < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    create_table :comments, id: :uuid do |t|
      t.uuid :post_id
      t.uuid :chapter_id
      t.uuid :user_id
      t.text :content
      t.string :parent_id

      t.timestamps
    end
  end
end
