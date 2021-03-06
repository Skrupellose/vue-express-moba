const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  banner: {
    type: String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
  }],
  scores: {
    difficult: {
      type: Number
    },
    skills: {
      type: Number
    },
    attack: {
      type: Number
    },
    survive: {
      type: Number
    }
  },
  skills: [{
    icon: {
      type: String
    },
    name: {
      type: String
    },
    cd: {
      type: String
    },
    cost: {
      type: String 
    },
    description: {
      type: String
    },
    tips: {
      type: String
    }
  }],
  items1: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
  }],
  items2: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
  }],
  useTips: {
    type: String
  },
  battleTips: {
    type: String
  },
  teamTips: {
    type: String
  },
  partners: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'
    },
    description: {
      type: String
    }
  }]
})

module.exports = mongoose.model('Hero', schema, 'heroes')