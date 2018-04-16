class CreateChapters < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'citext'
    create_table :chapters do |t|
      t.citext  :title, null: false
      t.string  :origin_content
      t.string  :content
      t.boolean :public, default: false
      # WHo is translate it
      t.string  :translator, default: false
      # WHo is edit this chapter
      t.string  :editor, default: false
      # who is approve this chapter
      t.string  :approve_by, default: false
      t.string  :image
      t.integer :like, default: 0
      t.integer :rating, default: 0
      t.integer :visited, default: 0
      t.text    :description
      t.string  :origin_link
      t.integer :post_id
      t.timestamps
    end
  end
end
