class TypePost < ApplicationRecord
  belongs_to :post
  belongs_to :type
end
