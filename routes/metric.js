const express = require('express');
var expressJoi = require('express-joi-validator');
var Joi = require('joi');
const router = express.Router();

const metrics = [];
const hour = 3600000;

function emptyMetrics() {
    metrics.length = 0;
};

const metricsSchema = {
    body: {
        value: Joi.number().required()
    }
};

setInterval(emptyMetrics, hour);

/* Add new metric */
router.post('/:key', expressJoi(metricsSchema, { convert: false }), (req, res) => {
    let lookupMetric = metrics.find((metric) => {return metric.key === req.params.key});

    if (lookupMetric) {
        lookupMetric.value = lookupMetric.value + Math.round(req.body.value);
    } else {
        let newMetric = {'key': req.params.key, 'value': Math.round(req.body.value)}
        metrics.push(newMetric);
    }
    res.send('');
})

/* Get metric by key */
router.get('/:key/sum', (req, res) => {
    let requestedMetric = metrics.find((metric) => {
        return metric.key === req.params.key
    });
    res.send("value: " + requestedMetric.value.toString());
})

module.exports = router;